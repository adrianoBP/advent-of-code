using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day6
    {

        public static string Part1()
        {
            List<string> groups = File.ReadAllText(@"Media/day6input.txt").Split(Environment.NewLine + Environment.NewLine).ToList();

            int total = 0;

            foreach(var group in groups)
            {
                HashSet<char> answers = new HashSet<char>();
                foreach(var person in group.Split(Environment.NewLine).ToList())
                {
                    foreach(var answer in person)
                    {
                        answers.Add(answer);
                    }
                }

                total += answers.ToList().Count;
            }

            return $"{total}";
        }


        public static string Part2()
        {
            List<string> groups = File.ReadAllText(@"Media/day6input.txt").Split(Environment.NewLine + Environment.NewLine).ToList();

            int total = 0;

            foreach (var group in groups)
            {
                List<string> people = group.Split(Environment.NewLine).ToList();

                if(people.Count == 1)
                {
                    total += people[0].Length;
                    continue;
                }

                List<char> commonAnswers = new List<char>();

                foreach (var person in people)
                {

                    var answers = new HashSet<char>(person.ToCharArray());

                    if (commonAnswers.Count == 0)
                        commonAnswers = answers.ToList();
                    else {
                        commonAnswers = commonAnswers.Intersect(answers).ToList();

                        if (commonAnswers.Count == 0)
                            break;
                    }
                }

                total += commonAnswers.Count;
            }

            return $"{total}";
        }
    }
}