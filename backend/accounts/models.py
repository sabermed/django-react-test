from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    """Helps Django work with our custom user model."""

    def create_user(self, nom, prenom, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not nom:
            raise TypeError('The Nom must be set')
        if not prenom:
            raise TypeError('The Prenom must be set')
        if not email:
            raise TypeError('The Email must be set')

        email = self.normalize_email(email)  # lower case email
        user = self.model(nom=nom, prenom=prenom, email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, nom, prenom, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        user = self.create_user(
            nom=nom,
            prenom=prenom,
            email=email,
            password=password,
        )
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        db_table = "User"

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
