import os

# Current folder
folder_path = "."

# Loop through all files in the current folder
for filename in os.listdir(folder_path):
    if "_" in filename:
        new_name = filename.split("_")[0] + os.path.splitext(filename)[1]
        os.rename(filename, new_name)
        print(f"Renamed: {filename} --> {new_name}")