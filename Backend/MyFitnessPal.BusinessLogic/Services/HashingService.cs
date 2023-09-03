﻿using MyFitnessPal.BusinessLogic.Interfaces;
using System.Security.Cryptography;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class HashingService : IHashingService
    {
        private const int SaltSize = 16; //128 bits
        private const int KeySize = 32; //256 bits
        private const int Iterations = 10000;

        public string CalculateHashValueWithInput(string input)
        {

            using (var algorithm = new Rfc2898DeriveBytes(input, SaltSize, Iterations, HashAlgorithmName.SHA512))
            {
                var hash = Convert.ToBase64String(algorithm.GetBytes(KeySize));
                var salt = Convert.ToBase64String(algorithm.Salt);

                return $"{Iterations}.{salt}.{hash}";
            }
        }
        public bool IsPasswordVerified(string initialHash, string usedSalt, string input)
        {
            string reHashedPassword = "";

            byte[] saltByteArr = Convert.FromBase64String(usedSalt);
            using (var algorithm = new Rfc2898DeriveBytes(input, saltByteArr, Iterations, HashAlgorithmName.SHA512))
            {
                var hash = Convert.ToBase64String(algorithm.GetBytes(KeySize));
                var salt = Convert.ToBase64String(algorithm.Salt);

                reHashedPassword = $"{Iterations}.{salt}.{hash}";
            }

            if (initialHash == reHashedPassword)
                return true;
            return false;
        }
    }
}
