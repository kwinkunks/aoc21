import numpy as np
from scipy.ndimage import generic_filter, label
from collections import Counter

def get_data(day, dataset):
    with open(f'../js/day{day:02d}/{dataset}.txt', 'r') as f:
        return np.array([list(map(int, row.strip())) for row in f.readlines()])

FOOTPRINT = [[False, True, False,],
             [True, False, True,],
             [False, True, False,],]

def part1(data):
    mins = generic_filter(data, np.min, footprint=FOOTPRINT, mode='constant', cval=10)
    pts = (data < mins) * (data + 1)
    return np.sum(pts)

def part2(data):
    labels, num_features = label(9 - data) # Default structure is ok.
    c = Counter(list(labels.flat))
    return np.prod(sorted(c.values())[-4:-1]) # Last is null class.

if __name__ == "__main__":
    # Part 1.
    assert part1(get_data(9, 'test')) == 15, "Part 1 failed."
    print(f"Part 1: {part1(get_data(9, 'data'))}")

    # Part 2.
    assert part2(get_data(9, 'test')) == 1134, "Part 2 failed."
    print(f"Part 2: {part2(get_data(9, 'data'))}")
