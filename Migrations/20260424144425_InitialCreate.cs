using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TruckerService.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Caminhoes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Placa = table.Column<string>(type: "TEXT", nullable: false),
                    Chassi = table.Column<string>(type: "TEXT", nullable: false),
                    Marca = table.Column<string>(type: "TEXT", nullable: false),
                    Modelo = table.Column<string>(type: "TEXT", nullable: false),
                    Ano = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Caminhoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mecanicos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Cpf = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mecanicos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrdensServico",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Titulo = table.Column<string>(type: "TEXT", nullable: false),
                    DescricaoProblema = table.Column<string>(type: "TEXT", nullable: false),
                    DataHoraAbertura = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    CaminhaoId = table.Column<int>(type: "INTEGER", nullable: false),
                    MecanicoId = table.Column<int>(type: "INTEGER", nullable: true),
                    DataHoraFechamento = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DescricaoServicoRealizado = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdensServico", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdensServico_Caminhoes_CaminhaoId",
                        column: x => x.CaminhaoId,
                        principalTable: "Caminhoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdensServico_Mecanicos_MecanicoId",
                        column: x => x.MecanicoId,
                        principalTable: "Mecanicos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrdensServico_CaminhaoId",
                table: "OrdensServico",
                column: "CaminhaoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdensServico_MecanicoId",
                table: "OrdensServico",
                column: "MecanicoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrdensServico");

            migrationBuilder.DropTable(
                name: "Caminhoes");

            migrationBuilder.DropTable(
                name: "Mecanicos");
        }
    }
}
