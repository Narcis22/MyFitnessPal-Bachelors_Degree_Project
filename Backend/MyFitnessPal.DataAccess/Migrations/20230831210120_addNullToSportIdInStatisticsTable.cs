using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFitnessPal.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addNullToSportIdInStatisticsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statistics_Sports_SportId",
                table: "Statistics");

            migrationBuilder.AlterColumn<int>(
                name: "SportId",
                table: "Statistics",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Statistics_Sports_SportId",
                table: "Statistics",
                column: "SportId",
                principalTable: "Sports",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statistics_Sports_SportId",
                table: "Statistics");

            migrationBuilder.AlterColumn<int>(
                name: "SportId",
                table: "Statistics",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Statistics_Sports_SportId",
                table: "Statistics",
                column: "SportId",
                principalTable: "Sports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
