class Cluster < ApplicationRecord
  has_many :pairs
  validates_uniqueness_of :day

  def next_cluster
    # puts "*" * 50
    # puts "first"
    @cluster = Cluster.where("assigned = ? AND day > ?", true, self.day).order(:day).first
    # debugger
    # self.where("assigned = ?, id > ?", true, id).first
    redirect_to root_url
  end

  # def back
  #   next_cluster
  #   debugger
  #   @cluster = @temp
  # end

  # def nexttt
  #   next_day =
  # end
  # def next_assigned_day
  #   Cluster.find_by_assigned(:day)
  # end


  def date_on_day(day)
    Cluster.find_by_day(day)
  end

  def self.generate(all_students)
    list = all_students.to_a.shuffle
    number_pairs = list.length / 2

    first, *rest = *list
    rest.each_with_index do |person, index|
      cluster = Cluster.create
      Pair.create(cluster: cluster, users: [first, person])
      (1..number_pairs - 1).each do |offset|
        Pair.create(
          cluster: cluster,
          users: [
            rest[(index - offset) % rest.length],
            rest[(index + offset) % rest.length]
          ]
        )
      end
      if list.length.odd?
        Pair.create(
          cluster: cluster,
          users: [rest[(index + number_pairs) % rest.length]]
        )
      end
    end
  end
end
