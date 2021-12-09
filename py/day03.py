# Day 3.
# Terse pure Python solution.
def get_data(day, dataset):
    with open(f'../js/day{day:02d}/{dataset}.txt', 'r') as f:
        return list(map(list, map(str.strip, f.readlines())))

def transpose(arr):
    return [[arr[j][i] for j in range(len(arr))] for i in range(len(arr[0]))]

def common(data):
    return sum(1 if int(x) else -1 for x in data) > 0

def common_sum(data):
    return list(map(common, transpose(data)))

def boolbin_to_num(bools, flip=False):
    return sum((x^flip)*(2**(len(bools)-i-1)) for i, x in enumerate(bools))

def gamma(data):
    return boolbin_to_num(common_sum(data))

def epsilon(data):
    return boolbin_to_num(common_sum(data), flip=True)

def part1(data):
    return gamma(data) * epsilon(data)

def gas_rating(data, flip=False):
    data_ = [d.copy() for d in data]
    i = 0
    while len(data_) > 1:
        common_bits = common_sum(data)
        data_ = [x for x in data_ if x[i] == common_bits[i]]
        i += 1
    return data


if __name__ == "__main__":

    print(part1(get_data(3, 'test')))
    # Part 1.
    assert part1(get_data(3, 'test')) == 198, "Part 1 failed."
    print(f"Part 1: {part1(get_data(3, 'data'))}")

    print(gas_rating(get_data(3, 'test')))
    # Part 2.
    # assert count_up(run_sum(get_data(3, 'test'), window=3)) == 230, "Part 2 failed."
    # print(f"Part 2: {count_up(run_sum(get_data(3, 'data'), window=3))}")
