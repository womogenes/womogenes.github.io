
# Alright.

import csv

csvfile = open("total_cases.csv", "r")
reader = csv.reader(csvfile, delimiter = ",", quotechar = "|")

final = []

rowIndex = 0
for row in reader:
    
    if rowIndex == 0:
        columns = len(row)
        cases = [0] * columns
        final.append(row)
        rowIndex += 1
        continue

    for i in range(1, columns):
        if row[i] == "":
            row[i] = str(cases[i])
        else:
            cases[i] = int(row[i])

    final.append(row)
    
    rowIndex += 1

csvfile.close()

# Now write.
csvfile = open("total_cases_rewritten.csv", "w", newline = "\n")

writer = csv.writer(csvfile, delimiter = ",", quotechar = "|", quoting = csv.QUOTE_MINIMAL)
for r in final:
    writer.writerow(r)

csvfile.close()
