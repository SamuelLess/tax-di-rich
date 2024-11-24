import json
import matplotlib.pyplot as plt

FILENAME = "sample-11-24-05-37.json"
FILENAME = "sample-11-24-05-42.json"
FILENAME = "sample-11-24-06-28.json" # 50 samples of 9eeed60f-a7df (10, 20)
FILENAME = "sample-11-24-07-02.json" # 30 samples of 3a38 (25,35)
FILENAME = "sample-11-24-07-16.json" # 10 samples of b084 (50, 70)
FILENAME = "sample-11-24-07-29.json" # 5 samples of (50, 150)



ALGS = ["rand", "greedy", "algo"]
NAMES = ["Random", "Greedy", "CP-SAT"]

def main():
    with open(FILENAME) as f:
        data = json.load(f)
    print(data)
    """
    data = {alg: list[int] for alg in ALGS}
    """
    # create boxplot
    plt.boxplot([data[alg] for alg in ALGS], labels=NAMES)
    # add title
    plt.title("Algorithm comparison for 50 vehicles and 70 customers (n=10)")
    # add labels
    plt.xlabel("Algorithm")
    plt.ylabel("Total time")
    plt.show()


if __name__ == "__main__":
    main()