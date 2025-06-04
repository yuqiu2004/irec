import requests
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import Counter
from datetime import datetime

# ======================= 配置区域 ========================
FRONTEND_URL = "1.92.111.46:3000"
TOTAL_REQUESTS = 50000
CONCURRENT_THREADS = 10
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
OUTPUT_FILE = f"./frontend_test_results_{timestamp}.txt"
# ========================================================

response_times = []
status_counter = Counter()
failures = []

def log_result(message):
    with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
        f.write(message + "\n")

def frontend_task(task_id):
    start_time = time.time()
    try:
        response = requests.get(FRONTEND_URL)
        duration = round((time.time() - start_time) * 1000, 2)
        code = response.status_code
        status_counter[code] += 1
        response_times.append(duration)
        log_result(f"[Task {task_id}] GET {FRONTEND_URL} - Status: {code}, Time: {duration}ms")
    except Exception as e:
        failures.append(str(e))
        log_result(f"[Task {task_id}] Exception: {str(e)}")

def main():
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(f"=== 前端首页压测开始 ===\n")
        f.write(f"目标地址: {FRONTEND_URL}\n")
        f.write(f"请求总数: {TOTAL_REQUESTS}\n")
        f.write(f"并发线程数: {CONCURRENT_THREADS}\n")
        f.write(f"开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

    with ThreadPoolExecutor(max_workers=CONCURRENT_THREADS) as executor:
        futures = [executor.submit(frontend_task, i) for i in range(1, TOTAL_REQUESTS + 1)]
        for _ in as_completed(futures):
            pass

    # 统计
    success_count = sum(status_counter[code] for code in status_counter if 200 <= code < 300)
    fail_count = TOTAL_REQUESTS - success_count
    avg_time = round(sum(response_times) / len(response_times), 2) if response_times else 0
    max_time = round(max(response_times), 2) if response_times else 0
    min_time = round(min(response_times), 2) if response_times else 0

    with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
        f.write("\n=== 压测统计结果 ===\n")
        f.write(f"成功请求数: {success_count}/{TOTAL_REQUESTS}\n")
        f.write(f"失败请求数: {fail_count}\n")
        f.write(f"成功率: {success_count / TOTAL_REQUESTS * 100:.2f}%\n")
        f.write(f"平均响应时间: {avg_time} ms\n")
        f.write(f"最大响应时间: {max_time} ms\n")
        f.write(f"最小响应时间: {min_time} ms\n")
        f.write("\n状态码统计:\n")
        for code, count in status_counter.items():
            f.write(f"  {code}: {count} 次\n")
        if failures:
            f.write("\n异常统计:\n")
            failure_summary = Counter(failures)
            for msg, count in failure_summary.items():
                f.write(f"  {msg} - {count} 次\n")

if __name__ == "__main__":
    main()
