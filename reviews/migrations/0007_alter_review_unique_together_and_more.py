# Generated by Django 5.2 on 2025-04-06 03:21

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0006_alter_review_unique_together_review_movie_title_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='review',
            unique_together={('user', 'movie_id', 'movie_type')},
        ),
        migrations.AlterField(
            model_name='review',
            name='movie_title',
            field=models.CharField(default='Unknown Movie', max_length=255),
        ),
    ]
