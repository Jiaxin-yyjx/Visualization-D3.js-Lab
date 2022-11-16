import pandas as pd

# Lab4 Task1 - Jiaxin Yang
# 1. Read the energy data
df = pd.read_csv('electricity_generation.csv')

# 2. Find total generation (TYPE OF PRODUCER is 'Total Electric Power Industry' and ENERGY SOURCE is 'Total') data records from 2021/01 to 2021/12 (US-TOTAL for STATE is excluded)
df_2021 = df.loc[(df['YEAR'] == 2021) & (df['STATE'] != 'US-TOTAL') & (df['ENERGY SOURCE'] == 'Total') & (df['TYPE OF PRODUCER'] == 'Total Electric Power Industry')]
print(df_2021)

# 3. Output a CSV file which should contain 3 columns: MONTH, STATE, GENERATION(Mwh)
mon_stat_gen = df_2021.loc[:,['MONTH', 'STATE','GENERATION (Megawatthours)']]
mon_stat_gen = mon_stat_gen.rename({'GENERATION (Megawatthours)': 'GENERATION'}, axis=1) 
mon_stat_gen.to_csv('mon_stat_gen.csv', encoding='utf-8', index=False)

# 4. According to the original energy data, select 2021 monthly data based on TYPE OF PRODUCER. (Note that ENERGY SOURCE is 'Total')
df_2021_Mon = df.loc[(df['YEAR'] == 2021) & (df['ENERGY SOURCE'] == 'Total')].loc[:,['STATE', 'GENERATION (Megawatthours)', 'TYPE OF PRODUCER']]
print(df_2021_Mon)

# 5. Calculate the yearly sum of total GENERATION based on TYPE OF PRODUCER and STATE.
total_Type = df_2021_Mon.groupby(['STATE', 'TYPE OF PRODUCER'], as_index=False).sum('GENERATION (Megawatthours)')
print(total_Type)

# 6. Use pandas.pivot_table to rearrange the dataframe
table = pd.pivot_table(total_Type, values='GENERATION (Megawatthours)', index=['TYPE OF PRODUCER', 'STATE'])
print(table)

# 7. Output the CSV file which has 3 columns: STATE,TYPE OF PRODUCER, GENERATION(Mwh)

# 8. Prepare the same CSV file for the choropleth map in lab 3
df_map = df.loc[(df['YEAR'] == 2021) & (df['ENERGY SOURCE'] != 'Total') & (df['TYPE OF PRODUCER'] != 'Total Electric Power Industry')].loc[:,['STATE', 'ENERGY SOURCE','GENERATION (Megawatthours)', 'TYPE OF PRODUCER']]
sum2021 = df_map.groupby(['STATE'], as_index=False).sum('GENERATION (Megawatthours)').rename({'GENERATION (Megawatthours)': 'GENERATION', 'STATE': 'STATE_CODE'}, axis=1) 

region = pd.read_csv('us_regions_divisions.csv')
region = region.rename({'State': 'STATE', 'State Code': 'STATE_CODE'}, axis=1) 

state_Gen = sum2021.loc[:,['STATE_CODE', 'GENERATION']]
state_region = region.loc[:,['STATE', 'STATE_CODE']]
state_Gen = pd.merge(state_Gen, state_region, on='STATE_CODE')
state_Gen.to_csv('state_Gen.csv', encoding='utf-8', index=False)