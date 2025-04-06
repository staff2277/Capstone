from django.db import migrations, models

def set_default_movie_title(apps, schema_editor):
    Review = apps.get_model('reviews', 'Review')
    for review in Review.objects.all():
        review.movie_title = f"Movie {review.movie_id}" if review.movie_id else "Unknown Movie"
        review.save()

class Migration(migrations.Migration):
    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='movie_title',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.RunPython(set_default_movie_title),
        migrations.AlterField(
            model_name='review',
            name='movie_title',
            field=models.CharField(max_length=255),
        ),
        migrations.AddField(
            model_name='review',
            name='movie_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='review',
            name='movie_type',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ] 