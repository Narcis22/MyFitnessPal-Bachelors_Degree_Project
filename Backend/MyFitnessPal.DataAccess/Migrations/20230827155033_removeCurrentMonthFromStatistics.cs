using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFitnessPal.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class removeCurrentMonthFromStatistics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentMonth",
                table: "Statistics");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrentMonth",
                table: "Statistics",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
