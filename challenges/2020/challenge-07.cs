using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace adventofcode2020
{
    class Day7
    {

        public class Bag
        {
            public int Quantity { get; set; }
            public string Color { get; set; }
        }

        public static string Part1()
        {
            Dictionary<string, List<Bag>> dictRules = BuildRules();

            int counter = 0;
            foreach(var keyValuePair in dictRules)
            {
                if (ContainsGoldBag(dictRules, keyValuePair.Key))
                    counter++;
            }

            return $"{counter}";
        }

        public static Dictionary<string, List<Bag>> BuildRules()
        {
            List<string> rules = File.ReadAllLines(@"Media/day7input.txt").ToList();

            Dictionary<string, List<Bag>> dictRules = new Dictionary<string, List<Bag>>();

            foreach (var rule in rules)
            {
                var data = rule.Split("contain");

                string color = string.Join(' ', data[0].Replace("bags", "").Replace("bag", "").Trim());

                if (!dictRules.ContainsKey(color))
                {
                    List<Bag> bags = new List<Bag>();
                    data[1].Trim().Split(",").ToList().ForEach(bag =>
                    {

                        if (bag == "no other bags.")
                            return;

                        var bagData = bag.Trim().Split(" ").ToList();

                        bags.Add(new Bag()
                        {
                            Quantity = int.Parse(bagData[0].Trim()),
                            Color = string.Join(' ', bagData.Skip(1).Take(bagData.Count - 2))
                        });
                    });

                    dictRules.Add(color, bags);
                }
            }

            return dictRules;
        }

        public static bool ContainsGoldBag(Dictionary<string, List<Bag>> dictRules, string bagColor)
        {
            return dictRules[bagColor].Any(bag =>
            {
                if (bag.Color == "shiny gold")
                    return true;

                return ContainsGoldBag(dictRules, bag.Color);
            });
        }

        public static int CountRequiredBags(Dictionary<string, List<Bag>> dictRules, string bagColor)
        {
            int counter = 0;

            foreach(var bag in dictRules[bagColor])
            {

                if (dictRules[bag.Color].Count > 0)
                    counter += bag.Quantity * CountRequiredBags(dictRules, bag.Color) + bag.Quantity;
                else
                    counter += bag.Quantity;
            }

            return counter;
        }


        public static string Part2()
        {
            Dictionary<string, List<Bag>> dictRules = BuildRules();

            return $"{CountRequiredBags(dictRules, "shiny gold")}";
        }
    }
}