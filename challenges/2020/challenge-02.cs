using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day2
    {
        public static string Part1()
        {
            int validPasswords = 0;
            foreach(var row in File.ReadAllLines(@"Media/day2input.txt"))
            {
                if (IsPasswordValidPolocy1(row))
                    validPasswords++;
            }

            return $"{validPasswords}";
        }

        private static bool IsPasswordValidPolocy1(string row)
        {
            var data = row.Split(" ");

            int minTimes = int.Parse(data[0].Split('-')[0]);
            int maxTimes = int.Parse(data[0].Split('-')[1]);

            char charToCheck = data[1].Replace(":", "")[0];

            string password = data[2];

            int repetitions = 0;
            foreach(char currentChar in password)
            {
                if (currentChar == charToCheck)
                    repetitions++;
            }

            return repetitions >= minTimes && repetitions <= maxTimes;
        }

        public static string Part2()
        {
            int validPasswords = 0;
            foreach (var row in File.ReadAllLines(@"Media/day2input.txt"))
            {
                if (IsPasswordValidPolicy2(row))
                    validPasswords++;
            }

            return $"{validPasswords}";
        }

        private static bool IsPasswordValidPolicy2(string row)
        {
            var data = row.Split(" ");

            int firstIndex = int.Parse(data[0].Split('-')[0]) - 1;
            int secondIndex = int.Parse(data[0].Split('-')[1]) - 1;

            char charToCheck = data[1].Replace(":", "")[0];

            string password = data[2];

            if (password.Length < secondIndex + 1)
                return false;

            return (password[firstIndex] == charToCheck) != (password[secondIndex] == charToCheck);
        }
    }
}