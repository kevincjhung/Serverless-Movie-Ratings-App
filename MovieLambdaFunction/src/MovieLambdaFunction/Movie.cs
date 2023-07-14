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
        int year
    )
    {
        Title = title;
        Genre = genre;
        Description = description;
        Year = year;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = null!;
        
    [Column("genre")]
    public string Genre { get; set; } = "";

    [Column("description")]
    public string Description { get; set; } = "";
    [Column("year")]
    public int Year { get; set; }
}

// TODO: After database connection works, replace with real schema