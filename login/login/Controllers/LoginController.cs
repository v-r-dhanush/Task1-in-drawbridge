using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using login.Models;
using Microsoft.AspNetCore.Identity;
using System;

namespace login.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly PasswordHasher<string> _passwordHasher;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
            _passwordHasher = new PasswordHasher<string>();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            string storedHashBase64 = null;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("sp_GetPasswordHash", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Username", request.Username);

                connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        storedHashBase64 = reader["PasswordHash"].ToString();
                    }
                }
                connection.Close();
            }

            if (storedHashBase64 != null)
            {
                try
                {
                    // Decode Base64 hash from DB
                    byte[] hashBytes = Convert.FromBase64String(storedHashBase64);
                    string decodedHash = System.Text.Encoding.UTF8.GetString(hashBytes);

                    // Verify with PasswordHasher
                    var result = _passwordHasher.VerifyHashedPassword(request.Username, decodedHash, request.Password);

                    if (result == PasswordVerificationResult.Success)
                    {
                        return Ok(new { message = "Login successful" });
                    }
                }
                catch
                {
                    return StatusCode(500, new { message = "Error during password verification" });
                }
            }

            return Unauthorized(new { message = "Invalid username or password" });
        }
    }
}
