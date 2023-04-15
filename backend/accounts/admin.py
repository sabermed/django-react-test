from django.contrib import admin
from django.contrib.auth.models import Group
# Register your models here.
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom', 'prenom', 'email']
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
admin.site.unregister(Group)
