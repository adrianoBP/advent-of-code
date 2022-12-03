using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace adventofcode2020
{
    class Day5
    {
        class Seat
        {
            public double Row { get; set; }
            public double Column { get; set; }
        }

        public static string Part1()
        {
            List<string> boardinPasses = File.ReadAllLines(@"Media/day5input.txt").ToList();

            double highestSeatId = 0;

            foreach(var pass in boardinPasses)
            {
                var seat = GetSeat(pass);

                var seatId = seat.Row * 8 + seat.Column;

                if (seatId > highestSeatId)
                    highestSeatId = seatId;
            }

            return $"{highestSeatId}";
        }


        private static Seat GetSeat(string position)
        {
            Seat seat = new Seat()
            {
                Row = 0,
                Column = 0
            };

            string seatRowData = position.Substring(0, 7);
            string seatColumnData = position.Substring(7, 3);

            for (int i = 0; i < seatRowData.Length; i++)
            {
                if(seatRowData[i] == 'B')
                    seat.Row +=  128 / Math.Pow(2, i+1);
            }

            for(int i = 0; i < seatColumnData.Length; i++)
            {
                if(seatColumnData[i] == 'R')
                    seat.Column += 8 / Math.Pow(2, i + 1);
            }

            return seat;
        }

        public static string Part2()
        {
            List<string> boardinPasses = File.ReadAllLines(@"Media/day5input.txt").ToList();

            List<double> seatIds = new List<double>();

            foreach (var pass in boardinPasses)
            {
                var seat = GetSeat(pass);

                var seatId = seat.Row * 8 + seat.Column;
                seatIds.Add(seatId);
            }

            seatIds = seatIds.OrderBy(seat => seat).ToList();

            double mySeat = 0;

            for(int i = 0; i < seatIds.Count - 1; i++)
            {
                if (seatIds[i + 1] - seatIds[i] == 2)
                    mySeat = seatIds[i] + 1;
            }

            return $"{mySeat}";
        }
    }
}