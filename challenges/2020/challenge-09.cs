using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day9
    {
        public static string Part1()
        {
            List<long> numbers = File.ReadAllLines(@"Media/day9input.txt").Select(num => long.Parse(num)).ToList();

            int preambleLength = 25;

            for (int i = preambleLength; i < numbers.Count; i++)
            {
                if (!IsSum(numbers.Skip(i - preambleLength).Take(preambleLength).ToList(), numbers[i]))
                {
                    return $"{numbers[i]}";
                }
            }

            return "Not found";
        }

        static bool IsSum(List<long> valuesToCheck, long sum)
        {
            for (int i = 0; i < valuesToCheck.Count - 1; i++)
            {
                for (int j = 1; j < valuesToCheck.Count; j++)
                {
                    if (valuesToCheck[i] + valuesToCheck[j] == sum)
                        return true;
                }
            }

            return false;
        }


        public static string Part2()
        {
            List<long> numbers = File.ReadAllLines(@"Media/day9input.txt").Select(num => long.Parse(num)).ToList();

            if (!long.TryParse(Part1(), out long invalidNumber))
                return "Not found";

            for (int i = 0; i < numbers.Count; i++)
            {
                List<long> currentNumbers = new List<long>();

                for (int j = i + 1; j < numbers.Count; j++)
                {
                    currentNumbers.Add(numbers[j]);

                    if (currentNumbers.Sum() == invalidNumber)
                    {
                        return $"{currentNumbers.Min() + currentNumbers.Max()}";
                    }
                    else if (currentNumbers.Sum() > invalidNumber)
                        break;
                }
            }

            return $"Not found";
        }
    }
}