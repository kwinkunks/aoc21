import numpy as np
import matplotlib.pyplot as plt

def get_data(data):
    """
    Turn the raw string into a set of instructions and the 'paper'.
    """
    dots, instrux = data.strip().split('\n\n')
    instrux = [i.split('along ')[-1] for i in instrux.split('\n')]
    instrux = [i.split('=') for i in instrux]

    coords = np.array([list(map(int, i.split(','))) for i in dots.split('\n')])
    min_x, max_x = np.min(coords[:, 0]), np.max(coords[:, 0])
    min_y, max_y = np.min(coords[:, 1]), np.max(coords[:, 1])

    paper = np.zeros((max_y+1, max_x+1), dtype=int)
    paper[coords[:, 1], coords[:, 0]] = 1
    return paper, instrux

def fold(paper, axis, pos):
    """
    Make a fold.
    """
    if axis == 'y':
        top, bottom = np.array_split(paper, [pos,], axis=0)
        bottom = bottom[1:]
        if top.size > bottom.size:
            bottom = np.pad(bottom, ((0, len(top)-len(bottom)), (0, 0)), 'constant')
        else:
            top = np.pad(top, ((len(bottom)-len(top), 0), (0, 0)), 'constant')
        return top | np.flipud(bottom)
    elif axis == 'x':
        left, right = np.array_split(paper, [pos,], axis=1)
        right = right[:, 1:]
        if left.size > right.size:
            right = np.pad(right, ((0, 0), (0, len(left.T)-len(right.T))), 'constant')
        else:
            left = np.pad(left, ((0, 0), (len(right.T)-len(left.T), 0)), 'constant')
        return left | np.fliplr(right)

if __name__ == '__main__':

    with open('day13.txt') as f:
        data = f.read()

    paper, instrux = get_data(data)

    for instruction in instrux:
        axis, pos = instruction
        paper = fold(paper, axis, int(pos))

    plt.imshow(paper)
    plt.show()
