import numpy as np
from tqdm import tqdm

def get_data(day, dataset):
    with open(f'../js/day{day:02d}/{dataset}.txt', 'r') as f:
        return list(map(int, f.read().split(',')))

def run(fish, days):
    for day in tqdm(range(days)):
        fish = fish.count(0) * [np.int8(8)] + [np.int8(f - 1) if f > 0 else np.int8(6) for f in fish]
    return len(fish)

def count(fish, days):
    pass

if __name__ == "__main__":
    # Part 1.
    assert run(get_data(6, 'test'), 18) == 26, "Part 1 failed."
    assert run(get_data(6, 'test'), 80) == 5934, "Part 1 failed."
    print(f"Part 1: {run(get_data(6, 'data'), 80)}")

    # Part 2.
    # assert run(get_data(6, 'test'), 256) == 26984457539, "Part 2 failed."
    # print(f"Part 2: {run(get_data(6, 'data'), 256)}")
