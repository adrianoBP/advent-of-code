using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace adventofcode2020
{
    class Day4
    {

        private static List<string> requiredFields = new List<string>()
            {
                "byr",
                "iyr",
                "eyr",
                "hgt",
                "hcl",
                "ecl",
                "pid",
            };

        public static string Part1()
        {
            var content = File.ReadAllText(@"Media/day4input.txt");

            var data = content.Split(new string[] { Environment.NewLine + Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

            int validPassports = 0;
            foreach(var passportData in data)
            {
                if (requiredFields.All(field => passportData.Contains(field)))
                    validPassports++;
            }

            return $"{validPassports}";
        }

        public static string Part2()
        {
            var content = File.ReadAllText(@"Media/day4input.txt");

            var data = content.Split(new string[] { Environment.NewLine + Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

            int validPassports = 0;
            foreach (var passportData in data)
            {
                if (requiredFields.All(field => passportData.Contains(field)))
                {
                    var rowData = passportData.Replace("\r\n", " ").Split(" ");

                    bool invalidData = false;

                    foreach (var field in rowData)
                    {
                        try {
                            var fieldData = field.Split(":");
                            string fieldName = fieldData[0];
                            string fieldvalue = fieldData[1];

                            switch (fieldName)
                            {
                                case "byr":
                                    {
                                        int year = int.Parse(fieldvalue);
                                        if (year < 1920 || year > 2002)
                                            invalidData = true;
                                        break;
                                    }
                                case "iyr":
                                    {
                                        int year = int.Parse(fieldvalue);
                                        if (year < 2010 || year > 2020)
                                            invalidData = true;
                                        break;
                                    }
                                case "eyr":
                                    {
                                        int year = int.Parse(fieldvalue);
                                        if (year < 2020 || year > 2030)
                                            invalidData = true;
                                        break;
                                    }
                                case "hgt":
                                    {
                                        string unit = fieldvalue.Substring(fieldvalue.Length - 2, 2);
                                        int value = int.Parse(fieldvalue.Replace(unit, ""));
                                        switch (unit)
                                        {
                                            case "cm":
                                                if (value < 150 || value > 193)
                                                    invalidData = true;
                                                break;
                                            case "in":
                                                if (value < 59 || value > 76)
                                                    invalidData = true;
                                                break;
                                            default:
                                                invalidData = true;
                                                break;
                                        }
                                        break;
                                    }
                                case "hcl":
                                    {
                                        string pattern = "^#(?:[a-f0-9]{6})$";
                                        Regex rg = new Regex(pattern);
                                        if (!rg.Match(fieldvalue).Success)
                                            invalidData = true;
                                        break;
                                    }
                                case "ecl":
                                    {
                                        List<string> validColors = new List<string>() { "amb", "blu", "brn", "gry", "grn", "hzl", "oth" };
                                        if(!validColors.Any(color => color == fieldvalue))
                                            invalidData = true;
                                        break;
                                    }
                                case "pid":
                                    {
                                        string pattern = "^([0-9]{9}){1}$";
                                        Regex rg = new Regex(pattern);
                                        if (!rg.Match(fieldvalue).Success)
                                            invalidData = true;
                                        break;
                                    }
                                case "cid":
                                    break;
                                default:
                                    invalidData = true;
                                    break;
                            }

                        }catch(Exception)
                        {
                            invalidData = true;
                        }
                    }

                    if (!invalidData)
                        validPassports++;
                }
            }

            return $"{validPassports}";
        }
    }
}