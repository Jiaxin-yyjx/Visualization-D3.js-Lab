import pandas as pd

# Lab3 Task1 - Jiaxin Yang
# 1. Read the energy data
df = pd.read_csv('electricity_generation.csv')

# 2. Find data records from 2021/01 to 2021/12
df_2021 = df.loc[(df['YEAR'] == 2021)]
print(df_2021)

# 3. According to 2021 monthly data, calculate the yearly sum of electricity GENERATION based on STATE. (Note that 'total' is not a type of ENERGY SOURCE and 'Total Electric Power Industry' is not a 'TYPE OF PRODUCER')
# 4. Read US Census Bureau Region data (us_regions.csv) 
# 5. JOIN 'STATE CODE' and 'STATE' in us_regions.csv with 2021 yearly sum data ('STATE' in 2021 data should be renamed as 'STATE_CODE') 
# 6. Output a CSV file which should contain 3 columns: STATE, STATE_CODE, GENERATION 
# 7. Select the following 5 states: 'IL', 'IN', 'MI', 'OH', 'WI' from 2021 monthly data. 
# 8. Output a CSV file which should contain 3 columns: MONTH, STATE, GENERATION 
# 9. Merge 'State Code' and 'Region' in us_regions.csv and 2021 yearly sum data by 'State Code' 
# 10. Rearrange the data in H to the following format and output a JSON file through json library in Python (Left is JSON screenshot. Right is schematic diagram)