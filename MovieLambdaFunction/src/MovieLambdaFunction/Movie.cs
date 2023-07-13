using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MovieLambdaFunction;

[Table("Movie")]
public class Movie
{
    public Movie(
        string title,
        string genre,
        string description,
        string director,
        string actors,
        int year,
        int runtimeMinutes,
        double rating,
        int votes,
        double revenueMillions,
        int metascore
    )
    {
        Title = title;
        Genre = genre;
        Description = description;
        Director = director;
        Actors = actors;
        Year = year;
        RuntimeMinutes = runtimeMinutes;
        Rating = rating;
        Votes = votes;
        RevenueMillions = revenueMillions;
        Metascore = metascore;
    }

    [Key]
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string Genre { get; set; } = "";

    public string Description { get; set; } = "";

    public string Director { get; set; } = "";

    public string Actors { get; set; } = "";

    public int Year { get; set; }

    public int RuntimeMinutes { get; set; }

    public double Rating { get; set; }

    public int Votes { get; set; }

    public double RevenueMillions { get; set; }

    public int Metascore { get; set; }
}
