# Create a file to modify
echo "start" > activity.txt
git add .
git commit -m "Initial"

# Generate 150 random days of commits
for day in $(seq 1 150); do
  # Pick a random offset from 0 to 364 days ago
  offset=$((RANDOM % 365))
  
  # 1–4 commits on this day
  commits=$(( (RANDOM % 4) + 1 ))

  for c in $(seq 1 $commits); do
    # Modify file
    echo "update $RANDOM" >> activity.txt
    git add activity.txt

    # Generate a random time of day
    hour=$((RANDOM % 23))
    min=$((RANDOM % 59))
    sec=$((RANDOM % 59))

    # Create the commit with the chosen date
    GIT_AUTHOR_DATE="$(date -v-${offset}d +"%Y-%m-%d $hour:$min:$sec")" \
    GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE" \
    git commit -m "Random commit on day offset $offset"
  done
done
