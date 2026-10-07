import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib


# ============================================================
# 1. LOAD DATASET
# ============================================================

df = pd.read_csv("data/diabetes.csv")

print("Dataset loaded successfully!")
print("Original shape:", df.shape)


# ============================================================
# 2. CHECK DATASET
# ============================================================

print("\nFirst 5 rows:")
print(df.head())

print("\nDataset information:")
print(df.info())

print("\nMissing values:")
print(df.isnull().sum())

print("\nDuplicate rows:")
print(df.duplicated().sum())


# ============================================================
# 3. REMOVE DUPLICATE ROWS
# ============================================================

df = df.drop_duplicates()

print("\nShape after removing duplicates:", df.shape)


# ============================================================
# 4. HANDLE INVALID ZERO VALUES
# ============================================================

# In this dataset, zero is not a realistic value for these
# medical measurements.

columns_with_zero = [
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI"
]

for column in columns_with_zero:
    df[column] = df[column].replace(0, np.nan)


print("\nMissing values after replacing invalid zeros:")
print(df.isnull().sum())


# ============================================================
# 5. FILL MISSING VALUES
# ============================================================

# Use median because medical measurements can contain
# extreme values, and median is less affected by outliers.

for column in columns_with_zero:
    df[column] = df[column].fillna(df[column].median())


print("\nMissing values after median imputation:")
print(df.isnull().sum())


# ============================================================
# 6. SEPARATE FEATURES AND TARGET
# ============================================================

X = df.drop("Outcome", axis=1)
y = df["Outcome"]

print("\nFeatures:")
print(X.columns.tolist())

print("\nTarget:")
print("Outcome")


# ============================================================
# 7. TRAIN-TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining data shape:", X_train.shape)
print("Testing data shape:", X_test.shape)


# ============================================================
# 8. FEATURE SCALING
# ============================================================

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


# ============================================================
# 9. SAVE SCALER
# ============================================================

joblib.dump(scaler, "models/scaler.pkl")

print("\nScaler saved successfully!")


# ============================================================
# 10. SAVE PROCESSED DATA
# ============================================================

X_train_df = pd.DataFrame(
    X_train_scaled,
    columns=X.columns
)

X_test_df = pd.DataFrame(
    X_test_scaled,
    columns=X.columns
)

X_train_df["Outcome"] = y_train.values
X_test_df["Outcome"] = y_test.values

X_train_df.to_csv("data/train_processed.csv", index=False)
X_test_df.to_csv("data/test_processed.csv", index=False)


# ============================================================
# 11. FINAL OUTPUT
# ============================================================

print("\nPreprocessing completed successfully!")

print("\nProcessed training data:")
print(X_train_df.head())

print("\nProcessed testing data:")
print(X_test_df.head())

print("\nFinal training shape:", X_train_df.shape)
print("Final testing shape:", X_test_df.shape)