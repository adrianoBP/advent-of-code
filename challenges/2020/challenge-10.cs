using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day10
    {
        public static string Part1()
        {
            List<long> jolts = File.ReadAllLines(@"Media/day10input.txt").Select(jolt => long.Parse(jolt)).ToList();

            jolts.Add(0);
            jolts.Add(jolts.Max() + 3);
            jolts = jolts.OrderBy(jolt => jolt).ToList();

            Dictionary<long, int> dictDifferences = new Dictionary<long, int>()
            {
                { 1, 0 },
                { 3, 0 }
            };

            for (int i = 0; i < jolts.Count - 1; i++)
            {
                dictDifferences[jolts[i + 1] - jolts[i]]++;
            }

            return $"{dictDifferences[1] * dictDifferences[3]}";
        }


        public static string Part2()
        {
            List<long> jolts = File.ReadAllLines(@"Media/day10input.txt").Select(jolt => long.Parse(jolt)).ToList();

            jolts.Add(0);
            jolts.Add(jolts.Max() + 3);
            jolts = jolts.OrderBy(jolt => jolt).ToList();

            int combinations = 0;
            List<List<long>> visitedCombinations = new List<List<long>>();
            foreach (var jolt in jolts.Skip(1))
            {
                combinations += GetCombinations(jolts, jolt, ref visitedCombinations);
            }



            return $"TODO";  
        }

        // DOES NOT RETURN THE CORRECT RESULT
        private static int GetCombinations(List<long> jolts, long jolt, ref List<List<long>> combinations)
        {
            int possibleCombinations = 0;

            if (jolts.IndexOf(jolt) + 1 == jolts.Count)
                return 0;

            if (jolts[jolts.IndexOf(jolt) + 1] - jolts[jolts.IndexOf(jolt) - 1] <= 3) {
                possibleCombinations++;
                List<long> joltsCopy = new List<long>(jolts);
                joltsCopy.Remove(jolt);

                if (combinations.Contains(joltsCopy))
                    return possibleCombinations;

                combinations.Add(joltsCopy);

                foreach(var newJolt in joltsCopy.Skip(1))
                {
                    possibleCombinations += GetCombinations(joltsCopy, newJolt, ref combinations);
                }
            }

            return possibleCombinations;
        }
    }
}