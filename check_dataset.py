
import pandas as pd

# Load the diabetes dataset
df = pd.read_csv("C:\Users\ASUS\OneDrive\Desktop\Diabetes-prediction-system\data\raw\diabetes_binary_health_indicators_BRFSS2015.csv")

print("Dataset shape:", df.shape)

print("\nColumn names:")
print(df.columns.tolist())

print("\nFirst five rows:")
print(df.head())

print("\nData types:")
print(df.dtypes)

print("\nMissing values:")
print(df.isnull().sum())
