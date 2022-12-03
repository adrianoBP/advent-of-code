using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day3
    {
        public static string Part1()
        {
            var content = File.ReadAllLines(@"Media/day3input.txt").ToList();

            return $"{GetTreesGivenSlope(3, 1, content)}";
        }

        private static int GetTreesGivenSlope(int sideMove, int verticalMove, List<string> content)
        {
            int sideCounter = 0;
            int width = content[0].Length;

            int numberOfTrees = 0;

            for (int verticalCounter = 0; verticalCounter < content.Count; verticalCounter += verticalMove)
            {
                if (content[verticalCounter][sideCounter] == '#')
                    numberOfTrees++;
                sideCounter += sideMove;
                sideCounter %= width;
            }

            return numberOfTrees;
        }

        public static string Part2()
        {
            var content = File.ReadAllLines(@"Media/day3input.txt").ToList();

            List<(int, int)> slopes = new List<(int, int)>()
            {
                (1, 1),
                (3, 1),
                (5, 1),
                (7, 1),
                (1, 2),
            };

            long totalCounter = 1;

            foreach(var slope in slopes)
            {
                totalCounter *= GetTreesGivenSlope(slope.Item1, slope.Item2, content);
            }

            return $"{totalCounter}";
        }
    }
}