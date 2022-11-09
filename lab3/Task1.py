import pandas as pd

# Lab3 Task1 - Jiaxin Yang
# 1. Read the energy data
df = pd.read_csv('electricity_generation.csv')

# 2. Find data records from 2021/01 to 2021/12
df_2021 = df.loc[(df['YEAR'] == 2021)]
print(df_2021)

# 3. According to 2021 monthly data, calculate the yearly sum of electricity GENERATION based on STATE. (Note that 'total' is not a type of ENERGY SOURCE and 'Total Electric Power Industry' is not a 'TYPE OF PRODUCER')
tmp = df_2021.loc[:,['STATE', 'ENERGY SOURCE','GENERATION (Megawatthours)', 'TYPE OF PRODUCER']]
tmp1 = tmp.loc[(tmp['ENERGY SOURCE'] != 'Total') & (tmp['TYPE OF PRODUCER'] != 'Total Electric Power Industry')]
sum2021 = tmp1.groupby(['STATE'], as_index=False).sum('GENERATION (Megawatthours)')
print(sum2021)

# 4. Read US Census Bureau Region data (us_regions.csv)
region = pd.read_csv('us_regions_divisions.csv')
region = region.rename({'State': 'STATE', 'State Code': 'STATE_CODE'}, axis=1) 

# 5. JOIN 'STATE CODE' and 'STATE' in us_regions.csv with 2021 yearly sum data ('STATE' in 2021 data should be renamed as 'STATE_CODE') 
sum2021 = sum2021.rename({'GENERATION (Megawatthours)': 'GENERATION', 'STATE': 'STATE_CODE'}, axis=1) 
state_Gen = sum2021.loc[:,['STATE_CODE', 'GENERATION']]
state_region = region.loc[:,['STATE', 'STATE_CODE']]
state_Gen = pd.merge(state_Gen, state_region, on='STATE_CODE')
print(state_Gen)

# 6. Output a CSV file which should contain 3 columns: STATE, STATE_CODE, GENERATION 
state_Gen.to_csv('state_Gen.csv', encoding='utf-8', index=False)

# 7. Select the following 5 states: 'IL', 'IN', 'MI', 'OH', 'WI' from 2021 monthly data.
state_2021 = df_2021[df_2021['STATE'].isin(['IL', 'IN', 'MI', 'OH', 'WI'])]
print(state_2021)

# 8. Output a CSV file which should contain 3 columns: MONTH, STATE, GENERATION 
mon_sta_gen = state_2021.loc[:,['MONTH', 'STATE', 'GENERATION (Megawatthours)']]
mon_sta_gen = mon_sta_gen.rename({'GENERATION (Megawatthours)': 'GENERATION'}, axis=1)
mon_sta_gen.to_csv('mon_sta_gen.csv', encoding='utf-8', index=False)

# 9. Merge 'State Code' and 'Region' in us_regions.csv and 2021 yearly sum data by 'State Code' 
state_region = region.loc[:,['STATE_CODE', 'Region']]
state_region = pd.merge(state_region, sum2021, on='STATE_CODE')
print(state_region)

# 10. Rearrange the data in 9 to the following format and output a JSON file through json library in Python
print('10>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
state_region.groupby('Region').apply(print)
# state_region = state_region.groupby('Region')
# print(state_region)
state_region_groups = state_region.groupby('Region')
print(list(state_region_groups.groups.keys()))
tree = dict()
tree['name'] = 'US'
tree['children'] = []
for region in list(state_region_groups.groups.keys()):
  tree['children'].append({'name':region,'children':[]})

print(tree)