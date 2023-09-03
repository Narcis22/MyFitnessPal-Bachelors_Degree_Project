using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFitnessPal.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddPossibilityOfNullForFKInAchievementTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Achievements_Statistics_StatisticsId",
                table: "Achievements");

            migrationBuilder.AlterColumn<int>(
                name: "StatisticsId",
                table: "Achievements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Achievements_Statistics_StatisticsId",
                table: "Achievements",
                column: "StatisticsId",
                principalTable: "Statistics",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Achievements_Statistics_StatisticsId",
                table: "Achievements");

            migrationBuilder.AlterColumn<int>(
                name: "StatisticsId",
                table: "Achievements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Achievements_Statistics_StatisticsId",
                table: "Achievements",
                column: "StatisticsId",
                principalTable: "Statistics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
