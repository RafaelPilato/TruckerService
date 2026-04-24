using TruckerService.Data;
using TruckerService.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddScoped<ICaminhaoRepository, CaminhaoRepository>();
builder.Services.AddScoped<IMecanicoRepository, MecanicoRepository>();
builder.Services.AddScoped<IOrdemServicoRepository, OrdemServicoRepository>();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers(); //Controllers

// Repositories
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));

builder.Services.AddScoped<ICaminhaoRepository, CaminhaoRepository>();
builder.Services.AddScoped<IMecanicoRepository, MecanicoRepository>();
builder.Services.AddScoped<IOrdemServicoRepository, OrdemServicoRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();//Direciona para o controller

app.Run();
