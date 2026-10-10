
from pathlib import Path
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_PATH = (
    PROJECT_ROOT
    / "data"
    / "raw"
    / "diabetes_binary_health_indicators_BRFSS2015.csv"
)

TARGET = "Diabetes_binary"

df = pd.read_csv(DATA_PATH)

feature_columns = [
    column for column in df.columns if column != TARGET
]

# 1. Exact duplicate rows: features AND target are identical
print("Exact duplicate rows:", df.duplicated().sum())

# 2. Repeated feature combinations, regardless of target
print(
    "Rows repeating an earlier feature combination:",
    df.duplicated(subset=feature_columns).sum()
)

# 3. Summarize each unique feature combination
groups = df.groupby(feature_columns, dropna=False)[TARGET].agg(
    row_count="size",
    label_count="nunique"
)

# Feature combinations associated with both target labels
conflicting_groups = groups[groups["label_count"] > 1]

# Feature combinations repeated but with the same target label
repeated_groups = groups[
    (groups["row_count"] > 1) & (groups["label_count"] == 1)
]

print("\nUnique feature combinations:", len(groups))
print("Repeated groups with one target label:", len(repeated_groups))
print("Groups with conflicting target labels:", len(conflicting_groups))

print(
    "Rows belonging to conflicting groups:",
    conflicting_groups["row_count"].sum()
)

print(
    "Rows belonging to repeated, consistent groups:",
    repeated_groups["row_count"].sum()
)

# 4. Examine the conflicting labels
if not conflicting_groups.empty:
    conflict_keys = conflicting_groups.index

    conflict_rows = (
        df.set_index(feature_columns)
        .loc[conflict_keys]
        .reset_index()
    )

    print("\nTarget counts among conflicting groups:")
    print(conflict_rows[TARGET].value_counts().sort_index())

    print("\nFirst 10 conflicting groups:")
    print(conflicting_groups.head(10).to_string())

print("\nDuplicate investigation completed.")
