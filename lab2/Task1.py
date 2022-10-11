import pandas as pd

# The Energy Data:
# A: read the energy data.
df = pd.read_csv('organised_Gen.csv')

# B: Ohio data records from 2017/01 to 2021/12.
OH_data = df.loc[(df['STATE'] == 'OH') & (df['YEAR'] >= 2017) & (df['YEAR'] <= 2021)]
print(OH_data)

# C: energy source, yearly sumof.
tmp = df.loc[:,['YEAR','ENERGY SOURCE','GENERATION (Megawatthours)']]
sum_Generation = tmp.loc[(tmp['ENERGY SOURCE'] != 'Total')].groupby(['YEAR','ENERGY SOURCE'], as_index=False).sum('GENERATION (Megawatthours)')
print(sum_Generation)

# D: top 3 energy source.
top3 = sum_Generation.set_index('ENERGY SOURCE').groupby('YEAR')['GENERATION (Megawatthours)'].nlargest(3).reset_index()
print(top3)

# E: output a csv for year, energy source, and generation.
tmp.to_csv('energy_YEG1.csv', encoding='utf-8', index=False)

ohio_tmp = OH_data.loc[:,['YEAR','ENERGY SOURCE','GENERATION (Megawatthours)']]
sumOH = ohio_tmp.loc[(ohio_tmp['ENERGY SOURCE'] != 'Total')].groupby(['YEAR','ENERGY SOURCE'], as_index=False).sum('GENERATION (Megawatthours)')
top3OH = sumOH.set_index('ENERGY SOURCE').groupby('YEAR')['GENERATION (Megawatthours)'].nlargest(3).reset_index()
print('top3OH')
print(top3OH)
top3OH.to_csv('energy_YEG.csv', encoding='utf-8', index=False)

# F: ohio data, yearly sum.
sum_GenerationOH = OH_data.loc[:,['YEAR','GENERATION (Megawatthours)']].groupby('YEAR', as_index=False).sum('GENERATION (Megawatthours)')
sum_GenerationOH = sum_GenerationOH.rename({'GENERATION (Megawatthours)': 'TOTAL_GENERATION'}, axis=1) 
print(sum_GenerationOH)

# G: output a csv for year, total_generation.
sum_GenerationOH.to_csv('energyOH_YG.csv', encoding='utf-8', index=False)

# H: ohio data, sum of generation based on type of producer.
tmp2 = OH_data.loc[:,['TYPE OF PRODUCER','GENERATION (Megawatthours)']]
sum_GenerationOH2 = tmp2.loc[df['TYPE OF PRODUCER']!='Total Electric Power Industry'].groupby('TYPE OF PRODUCER', as_index=False).sum('GENERATION (Megawatthours)')
print(sum_GenerationOH2)

# I: output a csv for type of producer, generation.
sum_GenerationOH2.to_csv('energyOH_PG.csv', encoding='utf-8', index=False)

# The Stock Data:
# A: read the stock datasets. (From 01/03/2022 to 09/23/2022 for all 5 csv files.)
aapl = pd.read_csv('AAPL.csv')
amzn = pd.read_csv('AMZN.csv')
googl = pd.read_csv('GOOGL.csv')
meta = pd.read_csv('META.csv')
ndx = pd.read_csv('Nasdaq_100.csv')

# B: 7 days average price
avg_comp = pd.DataFrame()
avg_comp['AAPL_moving_avg'] = aapl['Price'].rolling(7).mean()
avg_comp['GOOGL_moving_avg'] = googl['Price'].rolling(7).mean()
avg_comp['META_moving_avg'] = meta['Price'].rolling(7).mean()
avg_comp['AMZN_moving_avg'] = amzn['Price'].rolling(7).mean()

avg_comp.insert(0, 'Date', aapl.loc[:, 'Date'], True)
avg_comp.dropna(inplace=True)
print(avg_comp)

# C: output a csv for 5 avg.
avg_comp.to_csv('stock_avg.csv', encoding='utf-8', index=False)

# D: output a csv for 6 prices.
price_comp = pd.DataFrame()
price_comp['Date'] = aapl['Date']
price_comp['NDX_price'] = ndx['Price']
price_comp['AAPL_price'] = aapl['Price']
price_comp['GOOGL_price'] = googl['Price']
price_comp['META_price'] = meta['Price']
price_comp['AMZN_price'] = amzn['Price']
print(price_comp)
price_comp.to_csv('stock_price.csv', encoding='utf-8', index=False)