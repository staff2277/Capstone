from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('reviews', '0002_add_movie_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='movie_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='review',
            name='movie_type',
            field=models.CharField(max_length=10),
        ),
    ] 