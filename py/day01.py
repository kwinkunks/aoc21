# Day 1.
# Terse pure Python solution.
def get_data(day, dataset):
    with open(f'../js/day{day:02d}/{dataset}.txt', 'r') as f:
        return list(map(int, filter(None, f.readlines())))

def count_up(data):
    return sum((b - a) > 0 for a, b in zip(data, data[1:]))

def run_sum(data, window=1):
    return [sum(data[i:i+window]) for i in range(len(data) - window + 1)]

def count(data, window=1):
    return count_up(run_sum(data, window))

if __name__ == "__main__":

    # Part 1.
    assert count_up(run_sum(get_data(1, 'test'))) == 7, "Part 1 failed."
    print(f"Part 1: {count_up(run_sum(get_data(1, 'data')))}")

    # Part 2.
    assert count_up(run_sum(get_data(1, 'test'), window=3)) == 5, "Part 2 failed."
    print(f"Part 2: {count_up(run_sum(get_data(1, 'data'), window=3))}")
