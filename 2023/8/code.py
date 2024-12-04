import math

content = open('/Users/anthonydevick/Developer/repos/advent-of-code-repo/2023/8/puzzleInput.txt').read()

def get_stuff() -> tuple[str, dict[str, tuple[str, str]]]:
    [dirs, lookup_str] = content.split('\n\n', 1)
    dirs = dirs.strip()
    lookup = {}
    for lookup_ln in lookup_str.split('\n'):
        for c in '()=,':
            lookup_ln = lookup_ln.replace(c, '')
        [key, left, right] = lookup_ln.split(maxsplit=2)
        lookup[key] = (left, right)
    return (dirs, lookup)

dir_map = {
    'L': 0,
    'R': 1,
}

def part_1():
    dirs, lookup = get_stuff()
    current = 'AAA'
    steps = 0
    while current != 'ZZZ':
        current_dir = dirs[steps % len(dirs)]
        print(current)
        current = lookup[current][dir_map[current_dir]]
        steps += 1
    print(steps)

def part_2_helper(start: 'str', dirs: str, lookup: dict[str, tuple[str, str]]) -> int:
    steps = 0
    current = start
    while current[-1] != 'Z':
        current_dir = dirs[steps % len(dirs)]
        current = lookup[current][dir_map[current_dir]]
        steps += 1
    return(steps)

def part_2():
    step_ls = []
    dirs, lookup = get_stuff()
    for loc in lookup:
        if loc[-1] == 'A':
            step_ls.append(part_2_helper(loc, dirs, lookup))
    print(math.lcm(*step_ls))

if __name__ == '__main__':
    part_1()
    part_2()