import pandas as pd

# Lab4 Task1 - Jiaxin Yang
# 1. Read the energy data
df = pd.read_csv('electricity_generation.csv')

# 2. Find total generation (TYPE OF PRODUCER is 'Total Electric Power Industry' and ENERGY SOURCE is 'Total') data records from 2021/01 to 2021/12 (US-TOTAL for STATE is excluded)
df_2021 = df.loc[(df['YEAR'] == 2021)]
print(df_2021)

# 3. Output a CSV file which should contain 3 columns: MONTH, STATE, GENERATION(Mwh)

# 4. According to the original energy data, select 2021 monthly data based on TYPE OF PRODUCER. (Note that ENERGY SOURCE is 'Total')

# 5. Calculate the yearly sum of total GENERATION based on TYPE OF PRODUCER and STATE.

# 6. Use pandas.pivot_table to rearrange the dataframe

# 7. Output the CSV file which has 3 columns: STATE,TYPE OF PRODUCER, GENERATION(Mwh)

# 8. Prepare the same CSV file for the choropleth map in lab 3