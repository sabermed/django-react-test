from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from decouple import config


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['token', 'nom', 'prenom', 'email', 'password']

    def validate(self, attrs):
        nom = attrs.get('nom', '')
        prenom = attrs.get('prenom', '')
        email = attrs.get('email', '')

        if not nom:
            raise serializers.ValidationError(
                {'message': 'nom is required'})
        if not prenom:
            raise serializers.ValidationError(
                {'message': 'prenom is required'})
        if not email:
            raise serializers.ValidationError(
                {'message': 'email is required'})
        return attrs

    def create(self, validated_data):
        token = validated_data.pop('token')
        if token != config('SIGNUP_TOKEN'):
            raise serializers.ValidationError({
                'message': 'Invalid signup token'})
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.ModelSerializer):
    nom = serializers.CharField(
        max_length=255, read_only=True)
    prenom = serializers.CharField(
        max_length=255, read_only=True)
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['nom', 'prenom', 'email', 'password', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = auth.authenticate(email=email, password=password)

        if not email:
            raise serializers.ValidationError(
                {'message': 'email is required'})
        if not password:
            raise serializers.ValidationError(
                {'message': 'password is required'})

        # if not user:
        #     raise serializers.ValidationError(
        #         {'message': 'Invalid credentials, try again'}, code='authentication')

        if not user:
            error = True
            raise AuthenticationFailed(
                {'message': 'Invalid credentials, try again'})

        return {
            'nom': user.nom,
            'prenom': user.prenom,
            'email': user.email,
            'token': user.tokens()['access']
        }


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')
