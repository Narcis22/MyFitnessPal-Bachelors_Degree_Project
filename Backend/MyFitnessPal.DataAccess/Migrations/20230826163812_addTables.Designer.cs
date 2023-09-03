﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyFitnessPal.DataAccess;

#nullable disable

namespace MyFitnessPal.DataAccess.Migrations
{
    [DbContext(typeof(MyFitnessPalDbContext))]
    [Migration("20230826163812_addTables")]
    partial class addTables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Achievement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<string>("Level")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StatisticsId")
                        .HasColumnType("int");

                    b.Property<int?>("Streak")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StatisticsId");

                    b.ToTable("Achievements");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Sport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Sports");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Statistics", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CurrentMonth")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FirstWorkoutDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("LastWorkoutDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SportId")
                        .HasColumnType("int");

                    b.Property<int>("TotalConsecutiveDays")
                        .HasColumnType("int");

                    b.Property<int>("TotalDuration")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SportId");

                    b.HasIndex("UserId");

                    b.ToTable("Statistics");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Token", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ExpireAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsTokenRevoked")
                        .HasColumnType("bit");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TokenValue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HashedPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.UserInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Age")
                        .HasColumnType("int");

                    b.Property<int?>("Height")
                        .HasColumnType("int");

                    b.Property<byte[]>("Image")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ImageContentType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfilePhotoId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sex")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<float?>("Weight")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("UsersInfo");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.UserMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Seen")
                        .HasColumnType("bit");

                    b.Property<DateTime>("SendDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserMessages");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Workout", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<float?>("Distance")
                        .HasColumnType("real");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<int>("StatisticsId")
                        .HasColumnType("int");

                    b.Property<int?>("Steps")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StatisticsId");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Achievement", b =>
                {
                    b.HasOne("MyFitnessPal.Entities.Entities.Statistics", "Statistics")
                        .WithMany("Achievements")
                        .HasForeignKey("StatisticsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Statistics");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Statistics", b =>
                {
                    b.HasOne("MyFitnessPal.Entities.Entities.Sport", "Sport")
                        .WithMany("Statistics")
                        .HasForeignKey("SportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MyFitnessPal.Entities.Entities.User", "User")
                        .WithMany("Statistics")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sport");

                    b.Navigation("User");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Token", b =>
                {
                    b.HasOne("MyFitnessPal.Entities.Entities.User", "User")
                        .WithOne("Token")
                        .HasForeignKey("MyFitnessPal.Entities.Entities.Token", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.User", b =>
                {
                    b.HasOne("MyFitnessPal.Entities.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.UserInfo", b =>
                {
                    b.HasOne("MyFitnessPal.Entities.Entities.User", "User")
                        .WithOne("UserInfo")
                        .HasForeignKey("MyFitnessPal.Entities.Entities.UserInfo", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.UserMessage", b =>
                {
                    b.HasOne("MyFitnessPal.Entities.Entities.User", "User")
                        .WithMany("UserMessages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Workout", b =>
                {
                    b.HasOne("MyFitnessPal.Entities.Entities.Statistics", "Statistics")
                        .WithMany("Workouts")
                        .HasForeignKey("StatisticsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Statistics");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Sport", b =>
                {
                    b.Navigation("Statistics");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.Statistics", b =>
                {
                    b.Navigation("Achievements");

                    b.Navigation("Workouts");
                });

            modelBuilder.Entity("MyFitnessPal.Entities.Entities.User", b =>
                {
                    b.Navigation("Statistics");

                    b.Navigation("Token");

                    b.Navigation("UserInfo");

                    b.Navigation("UserMessages");
                });
#pragma warning restore 612, 618
        }
    }
}
