using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MovieLambdaFunction;


// map to table name
[Table("movie")]
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
    [Column("id")]
    public Guid Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("genre")]
    public string Genre { get; set; } = "";

    [Column("description")]
    public string Description { get; set; } = "";

    [Column("director")]
    public string Director { get; set; } = "";

    [Column("actors")]
    public string Actors { get; set; } = "";

    [Column("year")]
    public int Year { get; set; } = 0;

    [Column("runtime_minutes")]
    public int RuntimeMinutes { get; set; } = 0;

    [Column("rating")]
    public double Rating { get; set; } = 0;

    [Column("votes")]
    public int Votes { get; set; } = 0;

    [Column("revenue_millions")]
    public double RevenueMillions { get; set; } = 0;

    [Column("metascore")]
    public int Metascore { get; set; } = 0;
}
