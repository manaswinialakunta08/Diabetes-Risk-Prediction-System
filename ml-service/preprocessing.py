import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

import joblib
# Load the diabetes dataset
df = pd.read_csv("data/diabetes.csv")

print("Dataset loaded successfully!")
print("Original shape:", df.shape)