from django.db import migrations

def populate_movie_fields(apps, schema_editor):
    Review = apps.get_model('reviews', 'Review')
    # Update existing reviews with default values
    Review.objects.filter(movie_id__isnull=True).update(movie_id=1)
    Review.objects.filter(movie_type__isnull=True).update(movie_type='movie')

def reverse_populate_movie_fields(apps, schema_editor):
    Review = apps.get_model('reviews', 'Review')
    # Set fields back to null
    Review.objects.filter(movie_id=1).update(movie_id=None)
    Review.objects.filter(movie_type='movie').update(movie_type=None)

class Migration(migrations.Migration):
    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_movie_fields, reverse_populate_movie_fields),
    ] 