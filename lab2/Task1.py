import pandas as pd

df = pd.read_csv('organised_Gen.csv')
OH_data = df.loc[(df['STATE'] == 'OH') & (df['YEAR'] >= 2017) & (df['YEAR'] <= 2021)]
print(OH_data)