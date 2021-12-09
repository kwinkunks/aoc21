import numpy as np

def get_data(day, dataset):
    with open(f'../js/day{day:02d}/{dataset}.txt', 'r') as f:
        return np.array(list(map(int, f.read().split(','))))

def part1(data):
    return np.abs(data - np.median(data)).sum()

def part2(data):
    points = np.arange(2000).reshape(-1, 1)
    dists = np.abs(np.subtract.outer(points, data))
    cost = np.sum(dists * (dists + 1) / 2, axis=-1)
    return cost.min()


if __name__ == "__main__":

    # Part 1.
    assert part1(get_data(7, 'test')) == 37, "Part 1 failed."
    print(f"Part 1: {part1(get_data(7, 'data')):.0f}")

    # Part 2.
    assert part2(get_data(7, 'test')) == 168, "Part 2 failed."
    print(f"Part 2: {part2(get_data(7, 'data')):.0f}")
