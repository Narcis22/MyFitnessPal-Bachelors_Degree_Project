using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFitnessPal.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class remooveStreakFieldInAchievementTableAndRenameImageFieldInUserInfoTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Streak",
                table: "Achievements");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "UsersInfo",
                newName: "ImageByteArray");

            migrationBuilder.AlterColumn<string>(
                name: "Level",
                table: "Achievements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageByteArray",
                table: "UsersInfo",
                newName: "Image");

            migrationBuilder.AlterColumn<string>(
                name: "Level",
                table: "Achievements",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Streak",
                table: "Achievements",
                type: "int",
                nullable: true);
        }
    }
}
