#!/usr/bin/env python
#
# osgav 202405
#

# date to start counting from:  Wednesday 6th July 2022
# date of first weeknotes post: Wednesday 13th July 2022
# date of epoch weeknotes post: Wednesday 30th August 2023
# this date represents the END of the 60th week
# /blog/weeknotes-60.html contains the reasoning for epoch being week 60

# so if i run this script on, say a Friday, and get X weeks and 2 days, the Wednesday
# that just passed was the END of week X, and i am currently 2 days into week X+1
# and writing a weeknotes post on Friday for the "previous week" i.e. the 7 days leading
# up to the Wednesday just passed, should use weeknotes-X for its number

from datetime import date, timedelta

today = date.today()
weeknotes_start = date(year=2022, month=7, day=6)
days_since_day_one = (today - weeknotes_start).days
days_since_latest_wednesday = days_since_day_one % 7
delta_since_latest_wednesday = timedelta(days=days_since_latest_wednesday)
date_of_latest_wednesday = today - delta_since_latest_wednesday
weeknotes_number_for_latest_wednesday = int(days_since_day_one / 7)
one_week = timedelta(days=7)
date_of_next_wednesday = date_of_latest_wednesday + one_week
days_until_next_wednesday = (date_of_next_wednesday - today).days
weeknotes_number_for_next_wednesday = weeknotes_number_for_latest_wednesday + 1

clrz = {}
clrz['BOLD'] = '\033[1m'
clrz['YELLOW'] = '\033[93m'
clrz['ENDC'] = '\033[0m'

print("\nuse {}{}weeknotes-{}{} for {} \t[{} days ago]".format(
    clrz['BOLD'],
    clrz['YELLOW'],
    weeknotes_number_for_latest_wednesday,
    clrz['ENDC'],
    date_of_latest_wednesday.strftime('%A %-d %B %Y'),
    days_since_latest_wednesday))

print("\ntoday is {}\n".format(today.strftime('%A %-d %B %Y')))

print("use {}{}weeknotes-{}{} for {} \t[{} days away]\n".format(
    clrz['BOLD'],
    clrz['YELLOW'],
    weeknotes_number_for_next_wednesday,
    clrz['ENDC'],
    date_of_next_wednesday.strftime('%A %-d %B %Y'),
    days_until_next_wednesday))

