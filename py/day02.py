# Day 2
# Terse Python solution.
def get_data(day, dataset):
    with open(f'../js/day{day:02d}/{dataset}.txt', 'r') as f:
        return list(map(str.split, filter(None, f.readlines())))

dirs = {'forward': 1 + 0j, 'down': 0 + 1j, 'up': 0 - 1j}

def endpoint(data):
    return sum(dirs[dir] * int(dist) for dir, dist in data)

def part1(data):
    end = endpoint(data)
    return end.real * end.imag

def endpoint_with_aim(data):
    position, aim = 0 + 0j, 0
    for dir, dist in data:
        aim += 0 if dir=='forward' else (int(dist) * dirs[dir]).imag
        position += (int(dist) + (aim * int(dist) * 1j)) if dir == 'forward' else 0
    return position

def part2(data):
    end = endpoint_with_aim(data)
    return end.real * end.imag
    

if __name__ == "__main__":

    # Part 1.
    assert part1(get_data(2, 'test')) == 150, "Part 1 failed."
    print(f"Part 1: {part1(get_data(2, 'data')):.0f}")

    # Part 2.
    assert part2(get_data(2, 'test')) == 900, "Part 2 failed."
    print(f"Part 2: {part2(get_data(2, 'data')):.0f}")
