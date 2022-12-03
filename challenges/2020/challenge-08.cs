using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day8
    {
        public static string Part1()
        {
            List<string> instructions = File.ReadAllLines(@"Media/day8input.txt").ToList();

            int accumulator = 0;
            List<int> executedInstructions = new List<int>();

            for (int i = 0; i < instructions.Count; i++)
            {
                if (executedInstructions.Contains(i))
                    break;

                executedInstructions.Add(i);

                var instructionData = instructions[i].Split(" ");

                string instruction = instructionData[0];
                int amount = int.Parse(instructionData[1]);

                if (instruction == "acc")
                    accumulator += amount;
                else if (instruction == "jmp")
                    i += amount - 1;
            }

            return $"{accumulator}";
        }

        public static string Part2()
        {
            List<string> instructions = File.ReadAllLines(@"Media/day8input.txt").ToList();

            int accumulator = 0;

            for (int j = 0; j < instructions.Count; j++)
            {
                accumulator = 0;

                var instructionsCopy = new List<string>(instructions);

                switch(instructions[j].Split(" ")[0])
                {
                    case "acc":
                        continue;
                    case "nop":
                        instructionsCopy[j] = instructionsCopy[j].Replace("nop", "jmp");
                        break;
                    case "jmp":
                        instructionsCopy[j] = instructionsCopy[j].Replace("jmp", "nop");
                        break;
                }

                bool isInfiniteLoop = false;
                List<int> executedInstructions = new List<int>();

                for (int i = 0; i < instructionsCopy.Count; i++)
                {
                    if (executedInstructions.Contains(i))
                    {
                        isInfiniteLoop = true;
                        break;
                    }

                    executedInstructions.Add(i);

                    var instructionData = instructionsCopy[i].Split(" ");

                    string instruction = instructionData[0];
                    int amount = int.Parse(instructionData[1]);

                    if (instruction == "acc")
                        accumulator += amount;
                    else if (instruction == "jmp")
                        i += amount - 1;
                }

                if (!isInfiniteLoop)
                    break;
            }

            return $"{accumulator}";
        }
    }
}