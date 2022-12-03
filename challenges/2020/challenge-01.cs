using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day1
    {
        public static string Part1()
        {
            List<int> reportData = new List<int>(File.ReadAllLines(@"Media/day1input.txt").Select(row => int.Parse(row)));

            for (int i = 0; i < reportData.Count; i++)
            {
                for (int j = 1; j < reportData.Count; j++)
                {
                    if (reportData[i] + reportData[j] == 2020)
                        return $"{reportData[i] * reportData[j]}";
                }
            }
            throw new Exception("Flag not found");
        }

        public static string Part2()
        {
            List<int> reportData = new List<int>(File.ReadAllLines(@"Media/day1input.txt").Select(row => int.Parse(row)));

            for (int i = 0; i < reportData.Count; i++)
            {
                for (int j = 1; j < reportData.Count; j++)
                {
                    for (int k = 2; k <reportData.Count; k++)
                    {
                        if (reportData[i] + reportData[j] + reportData[k] == 2020)
                            return $"{reportData[i] * reportData[j] * reportData[k]}";
                    }
                }
            }
            throw new Exception("Flag not found");
        }

    }
}