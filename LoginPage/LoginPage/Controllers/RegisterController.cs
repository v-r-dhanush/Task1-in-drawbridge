using login.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public RegisterController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        string connectionString = _configuration.GetConnectionString("DefaultConnection");

        // Hash and Base64-encode the password
        var passwordHasher = new PasswordHasher<string>();
        string hashedPassword = passwordHasher.HashPassword(request.Username, request.Password);
        string base64Hash = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(hashedPassword));

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            string query = "INSERT INTO Users (Username, PasswordHash) VALUES (@Username, @PasswordHash)";
            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Username", request.Username);
            command.Parameters.AddWithValue("@PasswordHash", base64Hash);

            connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            connection.Close();

            if (rowsAffected > 0)
            {
                return Ok(new { message = "User registered successfully" });
            }
            else
            {
                return StatusCode(500, new { message = "Registration failed" });
            }
        }
    }
}
